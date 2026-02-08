type CategoryPropertyType = 'TEXT' | 'DATE' | 'NUMBER' | 'SELECT';

interface CategoryPropertyValidation {
  min?: number;
  max?: number;
  enum?: string[];
  multiple?: boolean;
}

interface CategoryProperties {
  id: number;
  is_required: boolean;
  name: string;
  type: CategoryPropertyType;
  order: number;
  validation: CategoryPropertyValidation | null;
}

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  order: number;
  is_active: boolean;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  children: ICategory[] | null;
  properties: CategoryProperties[] | null;
}
