import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab, TextField } from '@mui/material';
import './ArticlesTabs.scss';
import { debounce } from '@mui/material/utils';
import { getArticles } from '../../store/articles/articlesThunks/articlesThunks';
import {
  resetArticles,
  updateFilters,
} from '../../store/articles/articlesSlice/articlesSlice';
import { getArticlesFilters } from '../../store/articles/articlesSelectors/articlesSelectors';
import { useAppDispatch } from '../../store';
import { popularTypeOfFilter } from './constants';

const ArticlesTabs = () => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const filters = useSelector(getArticlesFilters);

  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setTabValue(value);
    dispatch(resetArticles());

    if (value === 1) {
      dispatch(getArticles(popularTypeOfFilter));
      dispatch(
        updateFilters({
          ...filters,
          ...popularTypeOfFilter,
        }),
      );
    } else {
      dispatch(getArticles({}));
      dispatch(updateFilters({}));
    }
  };

  const handleSearch = useCallback(
    debounce((event) => {
      const query = event.target.value;
      dispatch(getArticles({ search: query }));
    }, 500),
    [dispatch],
  );

  return (
    <div className="articlesRoot">
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>

      <TextField
        fullWidth
        id="outlined-basic"
        label="Enter your article"
        variant="outlined"
        className="searchInput"
        onChange={handleSearch}
      />
    </div>
  );
};

export default ArticlesTabs;
