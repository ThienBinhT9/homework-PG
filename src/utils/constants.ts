export const HOST = 'http://api.training.div3.pgtest.co/api/v1'

export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const TEXT_REQUIRE = "Bạn chưa nhập trường này!"
export const TEXT_EMAIL = "Vui lòng nhập đúng định dạng email!"
export const TEXT_MIN_PASS = "Mật khẩu phải có nhiều hơn 6 kí tự!"
export const TEXT_MAX_PASS = "Mật khẩu chỉ được tối đã 12 kí tự!"
export const TEXT_REAPEAT_PASS = "Password không trùng khớp!"
export const TEXT_MIN_NAME = "Tên phải có nhiều hơn 3 kí tự!"
export const TEXT_MAX_NAME = "Tên chỉ được tối đã 50 kí tự!"

export const GENDERS = [
    {value:"male", label:"Nam"},
    {value:"famale", label:"Nữ"},
]

export const STATUS = [
    {value:"Pending"},
    {value:"Fulfilled"},
    {value:"Recelved"},
    {value:"Processing"}
]
