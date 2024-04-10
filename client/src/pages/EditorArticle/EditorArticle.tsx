import React, { useEffect } from 'react';
import { TextField, Button, CardMedia, Card } from '@mui/material';
import './EditorArticle.scss';
import { useSelector } from 'react-redux';
import {
  getArticleLoading,
  getArticleSelector,
} from '../../store/article/articleSelectors/articleSelectors';
import {
  getArticle,
  updateArticle,
  deleteArticle,
} from '../../store/article/articleThunks/articleThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import {
  resetArticle,
  updateArticleField,
} from '../../store/article/articleSlice/articleSlice';
import {
  addArticles,
  uploadImage,
} from '../../store/articles/articlesThunks/articlesThunks';
import Spinner from '../../components/Spinner';
import { Action, ThunkAction } from '@reduxjs/toolkit';

const EditorArticle = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const article = useSelector(getArticleSelector);
  const isLoading = useSelector(getArticleLoading);

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateArticleField({ field, value }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const newFormData = new FormData();
      newFormData.append('image', file);

      const url = await dispatch(uploadImage(newFormData));

      handleFieldChange(
        'image',
        `${import.meta.env.VITE_API_URL}${url.payload.url}`,
      );
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getArticle({ id }));
    }

    return () => {
      dispatch(resetArticle());
    };
  }, [dispatch, id]);

  const handleArticle = async () => {
    const articleData = {
      title: article?.title,
      description: article?.description,
      image: article?.image,
    };

    const dispatchAction: ThunkAction<
      void,
      RootState,
      unknown,
      Action<string>
    > = id
      ? updateArticle({ id, data: articleData })
      : addArticles(articleData);

    await dispatch(dispatchAction);
    navigate('/editor');
  };
  
  const handleDeleteArticle = () => {
    if (id) {
      dispatch(deleteArticle({ id })).then(() => navigate('/editor'));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="editorArticleRoot">
      <>
        {article?.image ? (
          <Card>
            <CardMedia
              component="img"
              height={300}
              image={article?.image}
              alt="Preview"
              className="editorArticleImage"
            />
          </Card>
        ) : (
          <div className="placeholderImage"/>
        )}
        <TextField
          label="Title"
          variant="outlined"
          value={article?.title}
          onChange={(event) => handleFieldChange('title', event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={article?.description}
          onChange={(event) =>
            handleFieldChange('description', event.target.value)
          }
          multiline
          fullWidth
          margin="normal"
        />
      </>
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        hidden
        onChange={handleImageChange}
      />
      <div className="editorButtonsWrapper">
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <div>
          {id && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteArticle}
            >
              Delete Article
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleArticle}
            className="eventButton"
            disabled={!article.title.length || !article.description.length || !article.image}
          >
            {id ? 'Update article' : 'Add article'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorArticle;
