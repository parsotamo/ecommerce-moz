import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import '../scss/components/_buttons.scss';
import '../scss/components/_dropzone.scss';

const DropZone = ({ id, fnUploader, images, setKey, setContent }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  const onDrop = (acceptedImages) => {
    if (files.length > 0) {
      const data = acceptedImages.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles([...files, ...data]);
      if (setContent) {
        setContent([...files, ...data]);
      }
    } else {
      setFiles(
        acceptedImages.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (setContent) {
        setContent([...acceptedImages]);
      }
    }
  };
  const submitImagesHandler = (e) => {
    setKey('uploadImages');
    if (files.length > 5) {
      setFiles([]);
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('prodImages', images);
    dispatch(fnUploader(id, formData));
    setFiles([]);
  };
  const removeImageHandler = (e, index) => {
    if (index > -1) {
      const data = [...files];
      data.splice(index, 1);
      setFiles(data);
      if (setContent) {
        setContent(data);
      }
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 5,
  });
  return (
    <div className='dropzone-container mt-5'>
      <div {...getRootProps()} className='dropzone-wrapper pt-5'>
        <input {...getInputProps()} />
        <div className='d-flex flex-column justify-content-center align-items-center h-100'>
          <i className='fas fa-images fa-3x text-danger'></i>
          <div className='dropzone-wrapper-text mt-3'>
            <h5>Clique ou arraste images para aqui</h5>
            <h5>Nuúmero máximo aceite: 5 images</h5>
            <span>Apenas formatos jpeg (jpg) e png</span>

            {isDragAccept && isDragActive && (
              <p className='text-success'>Adicionar</p>
            )}
            {isDragReject && (
              <p className='text-danger'>Formato não suportado</p>
            )}
          </div>
        </div>
      </div>
      {files.length > 0 && (
        <aside className='wrapper-preview'>
          {files.map((file, ind) => (
            <div className='wrapper-img' key={ind + 1}>
              <img
                src={file.preview}
                className='img-preview'
                alt='Visualizar Imagem'
              />
              <i
                className='fas fa-times-circle fa-lg text-danger remove-img'
                onClick={(e) => removeImageHandler(e, ind)}
              ></i>
            </div>
          ))}
          {id && (
            <div className='d-flex justify-content-center'>
              <button
                type='button'
                className='btn-gradient btn-gradient--secondary btn-gradient--sm d-inline-block me-2 mb-3'
                onClick={(e) => setFiles([])}
              >
                Cancelar
              </button>
              <button
                type='button'
                className='btn-gradient btn-gradient--primary btn-gradient--sm d-inline-block mb-3'
                onClick={submitImagesHandler}
              >
                Salvar
              </button>
            </div>
          )}
        </aside>
      )}
    </div>
  );
};

export default DropZone;
