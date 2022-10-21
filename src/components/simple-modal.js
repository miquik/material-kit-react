import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export const AlertModal = (props) => {
	const [open, setOpen] = React.useState(false);
    
	const handleCancel = (evt) => {
        if (props.cancelFunc) {
            props.cancelFunc(evt);
        }
		setOpen(false);
	};
	const handleAccept = (evt) => {
        if (props.acceptFunc) {
            props.acceptFunc(evt);
        }
		setOpen(false);
	};

	return (
		<Modal
			hideBackdrop
			open={props.open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-modal-title"
			aria-describedby="alert-modal-description"
		>
			<Box sx={{ ...style, width: 200 }}>
				<h2 id="child-modal-title">{props.title}</h2>
				<p id="child-modal-description">
					{props.content}
				</p>
				<Button onClick={handleAccept}>{props.acceptCaption}</Button>
				<Button onClick={handleCancel}>{props.cancelCaption}</Button>
			</Box>
		</Modal>
	);
};

/*
export const ChildModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (    
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
*/
