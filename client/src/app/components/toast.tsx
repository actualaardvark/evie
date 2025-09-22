// Container component to hold and display all toasts
const ToastContainer = () => (
  <div className="fixed top-4 right-4 z-50">
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} />
    ))}
  </div>
);