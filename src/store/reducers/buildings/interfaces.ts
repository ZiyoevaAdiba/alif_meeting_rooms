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
  buildingsError: null | any,
  addBuildingError: null | any,
  editBuildingError: null | any,
  buildings: IBuilding[],
  building: IBuilding, 
  showAlert: string,
}