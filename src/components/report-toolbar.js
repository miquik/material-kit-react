import { Box, Button, Typography } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { atom, useAtom } from "jotai";

export const reportAtom = atom({ user: 0, mod: '', pump: '', checklist: 0 });
export const prevReportAtom = atom({ user: 0, mod: '', pump: '', checklist: 0 });

export const ReportToolbar = (props) => {
	const [model, setModel] = useAtom(reportAtom);
	const [prevModel, setPrevModel] = useAtom(prevReportAtom);

	const isValid = (model.user > 0 && model.mod !== '');
	const isDirty =
		prevModel.mod !== model.mod ||
		prevModel.pump !== model.pump ||
		prevModel.checklist !== model.checklist;

	const canSave = isValid && isDirty;

	return (
		<>
			<Box {...props}>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
						m: -1,
					}}
				>
					<Box sx={{ m: 1 }}>
						<Button sx={{ mr: 1 }} color="primary" variant="outlined">
							<ReplyOutlinedIcon color="action" />
						</Button>
					</Box>
					<Typography sx={{ m: 1 }} variant="h4">
						INSPECTION REPORT
					</Typography>
					<Box sx={{ m: 1 }}>
						<Button sx={{ mr: 1 }} color="primary" variant="contained" onClick={() => {}}>
							New
						</Button>
						<Button
							sx={{ mr: 1 }}
							color="primary"
							variant="contained"
							disabled={!canSave}
							onClick={() => setPrevModel(model)}
						>
							Save
						</Button>
						<Button
							color="secondary"
							variant="contained"
							disabled={!isValid}
						>
							Submit
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};
