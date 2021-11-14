/*
 * We could have declared the test using an arrow function,
 * however, Mocha recommends that arrow functions are not used,
 * because they might cause some issues in certain situations.
 */

describe('Blog app', function () {
  const blogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: {
        name: 'Marko Lehtinen',
        username: 'marko',
      },
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: {
        name: 'Abdullah Hinnawi',
        username: 'admin',
      },
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 8,
      user: {
        name: 'Abdullah Hinnawi',
        username: 'admin',
      },
    },
  ];

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Abdullah Hinnawi',
      username: 'admin',
      password: '12345',
    };
    const user2 = {
      name: 'Marko Lehtinen',
      username: 'marko',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Blogs');
    cy.contains('Login to the application');
  });

  describe('Login', function () {
    it('login succeeds with correct credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('12345');
      cy.get('#login-button').click();

      cy.contains('Abdullah Hinnawi logged-in');
    });

    it('login fails with wrong password', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('#message')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(115, 28, 35)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Abdullah Hinnawi logged-in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: '12345' });
    });

    it('a blog can be created', function () {
      cy.contains('Create new blog').click();
      cy.get('#title').type(blogs[1].title);
      cy.get('#author').type(blogs[1].author);
      cy.get('#url').type(blogs[1].url);
      cy.get('#createBtn').click();
      cy.contains(`A new blog ${blogs[1].title} by ${blogs[1].author} added!`);
      // ensure that the blog is added to the list of all blogs
      cy.get('#allBlogsList').contains(
        `${blogs[1].title} by ${blogs[1].author}`
      );
    });

    describe('users can like a blog', function () {
      describe('several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog(blogs[1]);
          cy.createBlog(blogs[2]);
          cy.visit('http://localhost:3000');
        });

        it('like a blog', function () {
          cy.contains(`${blogs[1].title} by ${blogs[1].author}`)
            .contains('View')
            .as('viewBtn');

          cy.get('@viewBtn').click();
          cy.contains(`likes ${blogs[1].likes}`).contains('Like').as('likeBtn');
          cy.get('@likeBtn').click();
          cy.contains(`likes ${blogs[1].likes + 1}`);
        });
      });
    });

    describe('a user can delete own blogs', function () {
      describe('several blogs exist', function () {
        beforeEach(function () {
          cy.login({ username: 'marko', password: '12345' });
          cy.createBlog(blogs[0]);
          cy.contains('Logout').click();

          cy.login({ username: 'admin', password: '12345' });
          cy.createBlog(blogs[1]);
          cy.createBlog(blogs[2]);
          cy.visit('http://localhost:3000');
        });

        it('delete own blog', function () {
          cy.contains(`${blogs[1].title} by ${blogs[1].author}`)
            .contains('View')
            .as('viewBtn');

          cy.get('@viewBtn').click();
          cy.contains(`${blogs[1].user.name}`)
            .parent()
            .contains('Delete')
            .as('deleteBtn');
          cy.get('@deleteBtn').click();

          cy.get('html').should(
            'not.contain',
            `${blogs[1].title} by ${blogs[1].author}`
          );
        });

        it('can not delete blogs which belong to other users', function () {
          cy.contains(`${blogs[0].title} by ${blogs[0].author}`)
            .contains('View')
            .as('viewBtn');

          cy.get('@viewBtn').click();
          cy.contains(`${blogs[0].user.name}`)
            .parent()
            .should('not.contain', `Delete`);
        });
      });
    });

    describe('Blog posts are order by likes', function () {
      describe('several blogs exist', function () {
        beforeEach(function () {
          cy.login({ username: 'marko', password: '12345' });
          cy.createBlog(blogs[0]);
          cy.contains('Logout').click();

          cy.login({ username: 'admin', password: '12345' });
          cy.createBlog(blogs[1]);
          cy.createBlog(blogs[2]);
          cy.visit('http://localhost:3000');
        });

        it('the blog with most likes comes first', function () {
          // currently the blog with most likes is blogs[2] "Title: Canonical string reduction"
          cy.get('#allBlogsList')
            .get('.blog')
            .then(($blogs) => {
              console.log('$blogs', $blogs);
              console.log('$blogs[0]', $blogs[0]);
              return $blogs[0];
            })
            .contains(`${blogs[2].title} by ${blogs[2].author}`);

          // increase blogs[0] likes by 2 to be the blog with most likes
          cy.contains(`${blogs[0].title} by ${blogs[0].author}`)
            .contains('View')
            .as('viewBtn');

          cy.get('@viewBtn').click();
          cy.contains(`likes ${blogs[0].likes}`).contains('Like').as('likeBtn');

          cy.get('@likeBtn').click();
          cy.contains(`likes ${blogs[0].likes + 1}`);

          cy.get('@likeBtn').click();
          cy.contains(`likes ${blogs[0].likes + 2}`);

          // check that the blogs[0] "Title: React patterns" is now the blog with the most likes
          cy.get('#allBlogsList')
            .get('.blog')
            .then(($blogs) => {
              console.log('$blogs', $blogs);
              console.log('$blogs[0]', $blogs[0]);
              return $blogs[0];
            })
            .contains(`${blogs[0].title} by ${blogs[0].author}`);
        });
      });
    });
  });
});
