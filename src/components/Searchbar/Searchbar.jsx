import { Formik } from 'formik';

import { errorEmptyInput } from 'components/Error/emptyInput';

import PropTypes from 'prop-types';

import {
  ConteinerBar,
  Button,
  LabelBtn,
  Input,
  FormsSt,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ text }, actions) => {
    if (text.trim() === '') {
      errorEmptyInput();
    }

    onSubmit(text);
    actions.setSubmitting(false);
  };

  return (
    <ConteinerBar>
      <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormsSt>
            <Button type="submit" disabled={isSubmitting}>
              <LabelBtn>Search</LabelBtn>
            </Button>

            <Input
              name="text"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </FormsSt>
        )}
      </Formik>
    </ConteinerBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
