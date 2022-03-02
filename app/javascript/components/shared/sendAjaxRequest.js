const sendAjaxRequest = (type, url, data, onSuccess = () => {}) => {
  return new Promise((resolve, reject) => {
    Rails.ajax({
      type: type,
      url: url,
      dataType: "json",
      data: (() => {
        return new URLSearchParams(data).toString();
      })(),
      success: onSuccess,
      error: (e) => reject(e),
    });
  });
};

export default sendAjaxRequest;
