import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { User } from '../../store/articles/articlesTypes/articlesTypes';
import './ArticlesListItem.scss';

interface ArticleListItemProps {
  title: string;
  description: string;
  image?: string;
  viewsCount: number;
  user: User;
  isEditor?: boolean;
  id: string;
  creator?: string;
}

const ArticleListItem = ({
  title,
  description,
  image,
  viewsCount,
  user,
  isEditor,
  id,
  creator,
}: ArticleListItemProps) => (
  <Link
    to={isEditor ? `/editor/article/${id}` : `/article/${id}`}
    className="articlesLink"
  >
    <Card className="articleCard">
      <div className="articlesImage">
        {image ? (
          <img src={image} alt={title} className="articleCardImage" />
        ) : (
          <div className="placeholderArticleImage"/>
        )}
      </div>
      <div className="contentWrapper">
        <CardContent>
          <Typography variant="h6" className="cardContentTitle">
            {title}
          </Typography>
          <Typography variant="body2" className="cardContentDescription">
            {description}
          </Typography>
          <Grid container justifyContent="space-between">
            <Grid item className="cardContentGrid">
              <Typography variant="body2">
                {user?.fullName || creator}
              </Typography>
            </Grid>
            <Grid item className="cardContentGrid">
              <IconButton size="small" className="cardIconButton">
                <VisibilityIcon />
              </IconButton>
              <Typography variant="body2">{viewsCount}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  </Link>
);

export default ArticleListItem;
