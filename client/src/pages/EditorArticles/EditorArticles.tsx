import './EditorArticles.scss';
import EditorArticlesList from '../../components/EditorArticlesList';
import EditorArticlesHeader from '../../components/EditorArticlesHeader';
import { getMyArticles } from '../../store/articles/articlesThunks/articlesThunks';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';

const EditorArticles = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyArticles({}));
  }, [dispatch]);

  return (
    <div className="editorArticlesRoot">
      <EditorArticlesHeader />
      <EditorArticlesList />
    </div>
  );
};

export default EditorArticles;
