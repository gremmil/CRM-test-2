import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  /*{
    state: 'reportesventas',
    type: 'link',
    name: 'Reportes Ventas',
    icon: 'assessment'
  },*/
  {
    state: 'callcenters',
    type: 'link',
    name: 'Call Centers',
    icon: 'add_business'
  },
  {
    state: 'usuarios',
    type: 'link',
    name: 'Usuarios',
    icon: 'group_add'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
