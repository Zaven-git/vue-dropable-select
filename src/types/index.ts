export interface DropDownWrapperItem {
  name: string;
  id: number;
}

export interface SelectedValue {
  index: number;
  title: string;
  value: string;
}

export interface DropDownItem {
  title: string;
  value: string;
}

export interface DragDropParams {
  element: object;
  newIndex: number;
  oldIndex: number;
}

export type DragDropedValue = {moved:DragDropParams}

