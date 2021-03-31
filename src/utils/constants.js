export const TOKEN = 'token';
export const CODE = 'code';

export const CURRENT_USER = 'currentUser';
export const MASTER = 'master';
export const MASTER_ENDPOINT = 'api/master';
export const ADMIN_ENDPOINT = 'api/admin';
export const GUEST_ENDPOINT = 'api/guest';
export const regexTel = /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/g;
export const PASSWORD_REGEX = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,72}$/;
export const NUMBER_REGEX = /^-?[0-9]+(?:\.[0-9]+)?$/;
export const LIST_UNIT = [
  { id: 1, name: 'Lục quân 1' },
  { id: 2, name: 'Không quân 1' },
  { id: 3, name: 'Hải quân 1' },
  { id: 4, name: 'Biên phòng 1' },
];

export const ErrorMessage = {
  VALIDATE_CODE_INVALID: 'Mã kiểm tra không chính xác.',
  INTERNAL_SERVER_ERROR: 'Có lỗi sảy ra trên server.',
  EMAIL_AND_PASSWORD_IS_INVALID: 'Thông tin tài khoản hoặc mật khẩu không chính xác.',
};

export const TestCollums = [
  {
    name: 'Đợt kiểm tra',
    field: 'testVersion',
  },
  {
    name: 'Tên quân nhân',
    field: 'name',
  },
  {
    name: 'Ngày sinh',
    field: 'dateOfBirth',
  },
  {
    name: 'Đơn vị',
    field: 'unit',
  },
  {
    name: 'Cấp bậc',
    field: 'rank',
  },
  {
    name: 'Chức vụ',
    field: 'position',
  },
  {
    name: 'Ngày nhập ngũ',
    field: 'joinArmy',
  },
  {
    name: 'Nghi ngờ',
    field: 'gender',
  },
];
