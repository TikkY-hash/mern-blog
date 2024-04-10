import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../../store';
import { getMyArticles } from '../../store/articles/articlesThunks/articlesThunks';
import { useSelector } from 'react-redux';
import {
  getArticlesCurrentPage,
  getArticlesLoading,
  getArticlesSelector,
  getArticlesTotalPages,
} from '../../store/articles/articlesSelectors/articlesSelectors';
import ArticlesListItem from '../ArticlesListItem';
import Spinner from '../Spinner';

const EditorArticlesList = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticlesSelector);
  const articlesCurrentPage = useSelector(getArticlesCurrentPage);
  const articlesTotalPage = useSelector(getArticlesTotalPages);
  const isLoading = useSelector(getArticlesLoading);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (articlesCurrentPage < articlesTotalPage && !isLoading) {
            dispatch(
              getMyArticles({
                page: articlesCurrentPage + 1,
                limit: 10,
              }),
            );
          }
        }
      });
      if (node) observer?.current?.observe(node);
    },
    [articlesCurrentPage, articlesTotalPage, isLoading, dispatch],
  );

  if (isLoading && !articles.length) return <Spinner />;

  return (
    <div>
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastArticleElementRef} key={article._id}>
              <ArticlesListItem {...article} id={article._id} isEditor />
            </div>
          );
        } else {
          return (
            <ArticlesListItem
              key={article._id}
              {...article}
              id={article._id}
              isEditor
            />
          );
        }
      })}
    </div>
  );
};

export default EditorArticlesList;
