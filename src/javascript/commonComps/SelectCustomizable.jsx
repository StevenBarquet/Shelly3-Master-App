// ---Dependencys
import React, { useState } from 'react';
import { Input, Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// ------------------------------------------ COMPONENT-----------------------------------------
const SelectCustomizable = props => {
  const { handleOption, menu, type } = props;
  const [customSelect, setCustomSelect] = useState({ tempValue: '' });

  function handleTempValue(e) {
    setCustomSelect({ ...customSelect, tempValue: e.target.value });
  }

  function addOption() {
    const { tempValue } = customSelect;
    const newOption = {
      label: tempValue,
      value: tempValue
    };
    handleOption(newOption, type);
  }

  return (
    <React.Fragment>
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          padding: 8
        }}
      >
        <Input
          style={{ flex: 'auto' }}
          value={customSelect.tempValue}
          onChange={handleTempValue}
        />
        <Button type="link" onClick={addOption}>
          <PlusOutlined /> Add item
        </Button>
      </div>
    </React.Fragment>
  );
};

export default SelectCustomizable;

// ------------------------------------------ DESCRIPTION-----------------------------------------
/*
  Componente que renderiza Opciones para un select con la caractetística de agregar nuevas Opciones en el selct
  Nota: Se requiere manejar como indica el ejemplo

    // ---Example simple
  // const Example = () => {
  //   // ---Handle Custom Select
  //   const [customSelect, setCustomSelect] = useState(someArray);
  //   function handleOption(newOption) {
  //     setCustomSelect([...customSelect, newOption]);
  //   }
  //   // ---Finish Custom Select
  //   return (
  //     <Select
  //       placeholder="Selecciona Procesador"
  //       dropdownRender={menu => (
  //         <SelectCustomizable menu={menu} handleOption={handleOption} />
  //       )}
  //     >
  //       {mapOptions(customSelect)} <- asumiendo que tienes este método y los imports necesarios
  //     </Select>
  //   );
  // };


  // ---Example multi selects
// const Example = () => {
//   // ---Handle Custom Select
//   const [customSelect, setCustomSelect] = useState({
//     shortMicro: optionsShortMicro,
//     origen: optionsOrigen,
//     laptopTypes: optionsType,
//     garantias: optionsGarantia
//   });
//   function handleOption(newOption, type) {
//     const { origen } = customSelect;
//     setCustomSelect({
//       ...customSelect,
//       [type]: [...origen, newOption]
//     });
//   }
//   // ---Finish Custom Select
//   return (
//     <Select
//       placeholder="Selecciona tu tipo de laptop"
//       dropdownRender={menu => (
//         <SelectCustomizable
//           menu={menu}
//           type="laptopTypes"
//           handleOption={handleOption}
//         />
//       )}
//     >
//       {mapOptions(customSelect.laptopTypes)}
//     </Select>
//   );
// };


*/
