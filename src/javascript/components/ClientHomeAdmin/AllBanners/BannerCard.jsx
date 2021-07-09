/* eslint-disable jsx-a11y/anchor-is-valid */
// ---Dependencys
import React, { useState } from 'react';
import { Row, Col, Popconfirm } from 'antd';
import {
  MobileOutlined,
  DesktopOutlined,
  EditOutlined
} from '@ant-design/icons';
// ---Util Comps
import CloseButton from 'Utils/CloseButton';
import ButtonMlg from 'Utils/ButtonMlg';
import FitImg from 'Utils/FitImg';
// ---CommonComps
import DinamicColorText from 'CComps/DinamicColorText';

// ---AUX COMPONENTS
function TitleSection(props) {
  const { bannerID, onDeleteBanner } = props;
  return (
    <>
      <Col xs={24} sm={24} lg={22}>
        <h2>{`Banner ${bannerID}`}</h2>
      </Col>
      <Col xs={2} sm={2} lg={2}>
        <Popconfirm
          title={`¿Deseas eliminar el banner: ${bannerID}？`}
          okText="Si"
          onConfirm={() => onDeleteBanner(bannerID)}
          cancelText="No"
        >
          <a href="#">
            <CloseButton estilo="form-close-button" />
          </a>
        </Popconfirm>
      </Col>
    </>
  );
}
function DisplaySection(props) {
  const { banner, desktopMode } = props;
  const { imgDesk, imgMovil, text, link, textColor } = banner;
  return (
    <>
      <Col xs={24} sm={24} lg={24}>
        <div
          className={
            desktopMode
              ? 'admin-banner-container-desktop'
              : 'admin-banner-container-mobil'
          }
        >
          <FitImg
            srcImg={desktopMode ? imgDesk : imgMovil}
            estilo="admin-banner-img"
            alt="Some text"
          />
          <DinamicColorText text={text} textColor={textColor} />
          {link && (
            <section>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="click-area" />
              </a>
            </section>
          )}
        </div>
      </Col>
    </>
  );
}
function MenuSection(props) {
  const { setIsDesktop, visible, bannerID, bannerFormEditMode } = props;
  const successStyle = visible ? { color: '#3ab415' } : {};
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row style={{ width: '100%' }}>
        <Col className="center-block" xs={24} sm={24} lg={6}>
          <h3>
            {'Activo: '}
            <span style={successStyle}>{visible ? 'Si' : 'No'}</span>
          </h3>
        </Col>
        <Col className="center-block" xs={24} sm={24} lg={6}>
          <ButtonMlg
            variant="blue"
            size="small"
            htmlType="button"
            onClick={() => setIsDesktop(true)}
            widthB="85%"
            label="Escritorio"
            icon={<DesktopOutlined />}
          />
        </Col>
        <Col className="center-block" xs={24} sm={24} lg={6}>
          <ButtonMlg
            variant="yellow"
            size="small"
            htmlType="button"
            onClick={() => setIsDesktop(false)}
            widthB="85%"
            label="Movil"
            icon={<MobileOutlined />}
          />
        </Col>
        <Col className="center-block" xs={24} sm={24} lg={6}>
          <ButtonMlg
            variant="blue-outline"
            size="small"
            htmlType="button"
            onClick={() => bannerFormEditMode(bannerID)}
            widthB="85%"
            label="Editar"
            icon={<EditOutlined />}
          />
        </Col>
      </Row>
    </Col>
  );
}
// ------------------------------------------ COMPONENT-----------------------------------------
function BannerCard(props) {
  // ----------------------- hooks, const, props y states
  const { bannerData, bannerFormMethods } = props;
  const [isDesktop, setIsDesktop] = useState(true);
  // ----------------------- Metodos Principales
  // ----------------------- Metodos Auxiliares
  return (
    <Col xs={24} sm={24} lg={24}>
      <div className="store-cart-form-container">
        <Row gutter={[20, 0]}>
          <TitleSection
            bannerID={bannerData.bannerID}
            onDeleteBanner={bannerFormMethods.onDeleteBanner}
          />
          <DisplaySection banner={bannerData.banner} desktopMode={isDesktop} />
          <MenuSection
            visible={bannerData.banner.visible}
            setIsDesktop={setIsDesktop}
            bannerID={bannerData.bannerID}
            bannerFormEditMode={bannerFormMethods.bannerFormEditMode}
          />
        </Row>
      </div>
    </Col>
  );
}

export default BannerCard;
