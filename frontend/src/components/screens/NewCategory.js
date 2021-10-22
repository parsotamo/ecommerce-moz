import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { createCategory, fetchCategories } from '../../actions';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 100,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    zIndex: 100,
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    overflow: 'hidden',
    width: '80%',
    height: '50%',
    filter: 'drop-shadow(0 3px 3px rgba(0, 0, 0, .3))',
  },
};

const NewCategory = ({ modalIsOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const { success: successCategories, categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (modalIsOpen && (!categories || categories.length === 0)) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const closeModal = (id, category) => {
    if (id && category) {
      dispatch(
        createCategory({
          category: id,
          name: category,
        })
      );
    }
    setCategoryId('');
    setSubCategory('');
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Nova Category'
    >
      <h2 className='text-capitalize my-5'>Criar categoria</h2>
      <div className='form-group mb-3'>
        <label className='fs-5' htmlFor='category'>
          Categoria Principal
        </label>
        <select
          id='category'
          className='form-select'
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Escolher Categoria</option>
          {successCategories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group mb-3'>
        <label className='fs-5' htmlFor='subCategory'>
          Sub Categoria
        </label>
        <input
          id='subCategory'
          type='text'
          value={subCategory}
          className='form-control py-3'
          onChange={(e) => setSubCategory(e.target.value)}
        />
      </div>
      <button className='btn btn-secondary' onClick={() => setIsOpen(false)}>
        cancelar
      </button>
      <button
        className='btn btn-danger'
        onClick={() => closeModal(categoryId, subCategory)}
      >
        Criar
      </button>
    </Modal>
  );
};

export default NewCategory;
