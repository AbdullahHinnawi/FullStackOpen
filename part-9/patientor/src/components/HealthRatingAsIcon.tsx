import { HealthCheckRating } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Fragment } from 'react';
import { Typography } from '@material-ui/core';

type HealthRatingAsIconProps = {
  healthRating: HealthCheckRating;
};
const HealthRatingAsIcon = ({
  healthRating,
}: HealthRatingAsIconProps): React.ReactElement => {
  switch (Number(healthRating)) {
    case 0:
      return (
        <Typography variant="body1">
          <FavoriteIcon sx={{ color: 'green' }} />
        </Typography>
      );
    case 1:
      return (
        <Typography variant="body1">
          <FavoriteIcon sx={{ color: 'yellow' }} />
        </Typography>
      );
    case 2:
      return (
        <Typography variant="body1">
          <FavoriteIcon sx={{ color: 'orange' }} />
        </Typography>
      );
    case 3:
      return (
        <Typography variant="body1">
          <FavoriteIcon sx={{ color: 'red' }} />
        </Typography>
      );
    default:
      return <Fragment />;
  }
};
export default HealthRatingAsIcon;
