import { createPortal } from "react-dom";
import { AiFillMail } from "react-icons/ai";

const MagicLinkModal = ({ show = false, email = "" }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <AiFillMail className="shrink-0 w-12 h-12 text-blue-500" />
          <h3 className="mt-2 text-2xl font-semibold">Confirm your email</h3>
          <p className="mt-4 text-lg">
            We emailed a magic link to <strong>{email}</strong>. Check your
            inbox and click the link in the email to login.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MagicLinkModal;
