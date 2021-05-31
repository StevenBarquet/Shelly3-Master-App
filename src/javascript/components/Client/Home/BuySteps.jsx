// ---Dependencys
import React from 'react';
import { Steps } from 'antd';
import {
  ShopOutlined,
  SafetyOutlined,
  IdcardOutlined,
  InboxOutlined
} from '@ant-design/icons';

const { Step } = Steps;

// ------------------------------------------ COMPONENT-----------------------------------------
const BuySteps = () => {
  return (
    <React.Fragment>
      <h4 className="steps-title">
        En <span>4</span> sencillos pasos
      </h4>
      <Steps>
        <Step
          status="finish"
          title="Elige"
          description="Excelentes opciones disponibles."
          icon={<ShopOutlined />}
        />
        <Step
          status="finish"
          title="Compra segura"
          icon={<SafetyOutlined />}
          description="Elige débito, crédito, efectivo o a contra-entrega"
        />
        <Step
          status="finish"
          title="Recolección"
          description="¿Donde quieres recibir o recoger tu compra?"
          icon={<IdcardOutlined />}
        />
        <Step
          status="finish"
          title="Entrega"
          description="Recibe el producto :)"
          icon={<InboxOutlined />}
        />
      </Steps>
    </React.Fragment>
  );
};

export default BuySteps;
