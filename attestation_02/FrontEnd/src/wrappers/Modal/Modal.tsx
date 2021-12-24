import React, { ReactNode, useEffect } from 'react';
import './Modal.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {
  children: ReactNode;
  isOpened: boolean;
  closeCallBack?: Function;
}

const Modal = ({ children, isOpened, closeCallBack }: Props) => {
  const onClose = () => {
    document.body.classList.remove('no_scroll');
    closeCallBack && closeCallBack();
  };

  useEffect(() => {
    isOpened ? document.body.classList.add('no_scroll') : document.body.classList.remove('no_scroll');
  }, [isOpened]);

  useEffect(() => {
    document.body.classList.remove('no_scroll');
  }, []);

  return (
    <div>
      {isOpened && (
        <div className="modal">
          <div className="modal__overlay" />
          <div className="modal__wrapper">{children}</div>
          <Button type="link" className="modal__close" onClick={onClose}>
            <CloseOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

Modal.defaultProps = {
  closeCallBack: () => {},
};

export default Modal;
