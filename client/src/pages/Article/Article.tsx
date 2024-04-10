import { Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  getArticleLoading,
  getArticleSelector,
} from '../../store/article/articleSelectors/articleSelectors';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../store/article/articleThunks/articleThunks';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import './Article.scss';
import Spinner from '../../components/Spinner';

const Article = () => {
  const dispatch = useAppDispatch();

  const article = useSelector(getArticleSelector);
  const isLoading = useSelector(getArticleLoading);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getArticle({ id, view: true }));
  }, [dispatch, id]);

  if (isLoading) return <Spinner />;

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom className="articleTitle">
          {article.title}
        </Typography>
      </Grid>
      <Grid item xs={12} mb={4}>
        <Card>
          <CardMedia
            component="img"
            image={article?.image}
            alt={article.title}
            height="400"
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              {article.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Article;
