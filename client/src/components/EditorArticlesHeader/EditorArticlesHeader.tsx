import { Button, TextField } from '@mui/material';
import './EditorArticlesHeader.scss';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@mui/material/utils';
import { useCallback } from 'react';
import { getMyArticles } from '../../store/articles/articlesThunks/articlesThunks';

const EditorArticlesHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddArticles = () => navigate(`/editor/article`);

  const handleSearch = useCallback(
    debounce((event) => {
      const query = event.target.value;
      dispatch(getMyArticles({ search: query }));
    }, 500),
    [dispatch],
  );

  return (
    <div className="editorArticlesWrapper">
      <Button
        fullWidth
        variant="contained"
        onClick={handleAddArticles}
        className="addArticlesButton"
      >
        Add article
      </Button>
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

export default EditorArticlesHeader;
