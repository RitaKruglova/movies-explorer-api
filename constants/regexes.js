const urlRegex = /https?:\/\/w?w?w?\.?.+\..+/;
const emailRegex = /\w+@\w+\.\w+/;
const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;

module.exports = {
  urlRegex,
  emailRegex,
  nameRegex,
};
