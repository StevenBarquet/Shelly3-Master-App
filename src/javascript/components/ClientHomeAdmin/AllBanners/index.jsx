import React from 'react';
import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
// ---Containers
import SomeBannerCont from 'Cont/ClientHomeAdmin/SomeBannerCont/index';

// --- FORM SECTIONS
function TitleSection(props) {
  const { allBannersMethods } = props;
  // ---Render
  return (
    <Col xs={24} sm={24} lg={24}>
      <Row gutter={[20, 0]}>
        <Col xs={24} sm={24} lg={24}>
          <h2>Carrusel</h2>
        </Col>
        <Col className="center-block" xs={24} sm={24} lg={24}>
          <ButtonMlg
            variant="blue"
            onClick={allBannersMethods.createNewBanner}
            size="small"
            htmlType="button"
            widthB="85%"
            label="Agregar banner"
            icon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </Col>
  );
}
function MapBanners(props) {
  const { bannerFormMethods, bannersData } = props;
  const { bannersArray } = bannersData;
  if (bannersArray && bannersArray.length > 0)
    return bannersArray.map(bannerData => (
      <SomeBannerCont
        bannerFormMethods={bannerFormMethods}
        allBannersData={bannersData}
        bannerData={bannerData}
        key={bannerData.bannerID}
      />
    ));
  return null;
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function AllBanners(props) {
  const { allBannersMethods, bannerFormMethods, bannersData } = props;
  return (
    <Row gutter={[20, 10]}>
      <TitleSection allBannersMethods={allBannersMethods} />
      <MapBanners
        bannerFormMethods={bannerFormMethods}
        bannersData={bannersData}
      />
    </Row>
  );
}

export default AllBanners;
