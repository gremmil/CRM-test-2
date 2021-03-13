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
    state: 'campanas',
    type: 'link',
    name: 'Campañas',
    icon: 'post_add'
  },
  {
    state: 'planes',
    type: 'link',
    name: 'Planes',
    icon: 'add_to_home_screen'
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
