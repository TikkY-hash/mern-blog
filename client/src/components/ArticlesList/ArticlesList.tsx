import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  getArticlesSelector,
  getArticlesCurrentPage,
  getArticlesTotalPages,
  getArticlesLoading,
  getArticlesFilters,
} from '../../store/articles/articlesSelectors/articlesSelectors';
import ArticlesListItem from '../ArticlesListItem';
import './ArticlesList.scss';
import { useAppDispatch } from '../../store';
import { getArticles } from '../../store/articles/articlesThunks/articlesThunks';
import Spinner from '../Spinner';

const ArticlesList = () => {
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticlesSelector);
  const articlesCurrentPage = useSelector(getArticlesCurrentPage);
  const articlesTotalPage = useSelector(getArticlesTotalPages);
  const isLoading = useSelector(getArticlesLoading);
  const observer = useRef<IntersectionObserver | null>(null);
  const filters = useSelector(getArticlesFilters);

  const lastArticleElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (articlesCurrentPage < articlesTotalPage && !isLoading) {
            dispatch(
              getArticles({
                ...filters,
                page: articlesCurrentPage + 1,
                limit: 10,
              }),
            );
          }
        }
      });
      if (node) observer?.current?.observe(node);
    },
    [articlesCurrentPage, articlesTotalPage, isLoading, filters, dispatch],
  );

  if (isLoading && !articles.length) return <Spinner />;

  return (
    <div className="articlesListRoot">
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastArticleElementRef} key={article._id}>
              <ArticlesListItem {...article} id={article._id} />
            </div>
          );
        } else {
          return (
            <ArticlesListItem key={article._id} {...article} id={article._id} />
          );
        }
      })}
    </div>
  );
};

export default ArticlesList;
