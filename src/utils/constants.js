export const TOKEN = 'token';
export const ENTRYCODE_TOKEN = 'enryCodeToken';
export const CODE = 'code';

export const DATE_FORMAT = 'dd/MM/yyyy';
export const MONTH_FORMAT = 'MM/yyyy';
export const CURRENT_USER = 'currentUser';
export const MASTER = 'master';
export const ADMIN_ENDPOINT = '/admin';
export const GUEST_ENDPOINT = '/guest';
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
  INTERNAL_SERVER_ERROR: 'Có lỗi xảy ra trên server.',
  POST_TEST_IS_NOT_FOUND: 'Bài làm của bạn hiện không có, xin vui lòng làm lại.',
  EMAIL_AND_PASSWORD_IS_INVALID: 'Thông tin tài khoản hoặc mật khẩu không chính xác.',
};

export const TestCollums = [
  {
    name: 'STT',
    field: 'stt',
    width: 'w-5',
  },
  {
    name: 'Tên quân nhân',
    field: 'name',
    width: 'w-15',
  },
  {
    name: 'MSQN',
    field: 'militaryCode',
    width: 'w-10',
  },
  {
    name: 'Đơn vị',
    field: 'unit',
    width: 'w-15',
  },
  {
    name: 'Cấp bậc',
    field: 'rank',
    width: 'w-10',
  },
  {
    name: 'Có bệnh',
    field: 'predictShallowFilter',
    width: 'w-10',
  },
  {
    name: 'Trung thực',
    field: 'predictDeepFilter',
    width: 'w-10',
  },
];
