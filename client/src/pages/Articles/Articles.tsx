import ArticlesList from '../../components/ArticlesList';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { getArticles } from '../../store/articles/articlesThunks/articlesThunks';
import ArticlesTabs from '../../components/ArticlesTabs';

const Articles = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles({}));
  }, [dispatch]);

  return (
    <div>
      <ArticlesTabs />
      <ArticlesList />
    </div>
  );
};

export default Articles;
