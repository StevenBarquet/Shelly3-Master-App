import React from 'react';
import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// ---Util Comps
import ButtonMlg from 'Utils/ButtonMlg';
// ---Comps
import BannerCard from 'Comp/ClientHomeAdmin/AllBanners/BannerCard';
import SomeBannerForm from 'Comp/ClientHomeAdmin/AllBanners/SomeBannerForm';

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
  const {
    bannerFormMethods,
    bannersArray,
    isEditingBanner,
    allBannersData
  } = props;
  if (bannersArray && bannersArray.length > 0)
    return bannersArray.map(bannerData => {
      const { bannerID } = bannerData;
      if (bannerID === isEditingBanner)
        return (
          <SomeBannerForm
            bannerID={bannerID}
            bannerFormMethods={bannerFormMethods}
            allBannersData={allBannersData}
            bannerData={bannerData}
            key={bannerID}
          />
        );
      if (bannerData.banner)
        return (
          <BannerCard
            bannerFormMethods={bannerFormMethods}
            bannerData={bannerData}
            key={bannerID}
          />
        );
      return null;
    });
  return null;
}
// --------------------------------------- FORM COMPONENT --------------------------------------
function AllBanners(props) {
  const { allBannersMethods, bannerFormMethods, allBannersData } = props;
  return (
    <Row gutter={[20, 10]}>
      <TitleSection allBannersMethods={allBannersMethods} />
      <MapBanners
        bannerFormMethods={bannerFormMethods}
        bannersArray={allBannersData.bannersArray}
        isEditingBanner={allBannersData.isEditingBanner}
        allBannersData={allBannersData}
      />
    </Row>
  );
}

export default AllBanners;
