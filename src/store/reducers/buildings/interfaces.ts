export interface IBuilding {
  id?: string, 
  name?: string,
  city?: {
    id: string,
    name: string
  },
  city_id?: string,
}

export interface IBuildingsReducer {
  loading: boolean,
  buildingsError: null | string,
  addBuildingError: null | string,
  editBuildingError: null | string,
  buildings: IBuilding[],
  building: IBuilding, 
  showAlert: string,
}