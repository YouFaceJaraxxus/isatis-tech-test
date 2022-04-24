import { get } from "../common/baseService"

const RAW_MATERIALS_PATH = 'rawMaterials';
export const getAllRawMaterials = () => {
  return get(RAW_MATERIALS_PATH);
}

export const getRawMaterialById = (id) => {
  return get(`${RAW_MATERIALS_PATH}/${id}`);
};