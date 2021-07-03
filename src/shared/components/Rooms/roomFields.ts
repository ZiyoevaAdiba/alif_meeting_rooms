export const fieldRoom = {
  city: 'city',
  created: 'created',
  id: 'id',
  name: 'name',
  number: 'number',
  status: 'status',
  photo: 'image',
  building_id: 'building_id',
}

export const addEditRoomFields = [
  {
    name: fieldRoom.number,
    label: "Номер",
    type: 'number'
  },
  {
    name: fieldRoom.name,
    label: "Название",
    type: 'text'
  },
];