const sendAjaxRequest = (type, url, data, onSuccess = null) => {
  return new Promise((resolve, reject) => {
    Rails.ajax({
      type: type,
      url: url,
      dataType: "json",
      data: (() => {
        return new URLSearchParams(data).toString();
      })(),
      success: onSuccess
        ? onSuccess
        : (data) => resolve({ ...data, ...onSuccess }),
      error: (e) => reject(e),
    });
  });
};

export default sendAjaxRequest;
