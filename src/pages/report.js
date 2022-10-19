import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head';
import { 
	Box, 
	Container, 
	Grid, 
	Typography, 
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Checkbox,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';
/// import { ArrowRightIcon } from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value; //assign the value of ref to the argument
	},[value]); //this code will run when the value of 'value' changes
	return ref.current; //in the end, return the current ref value.
}


function createData(ID, text, sub, checkID) {
	return { ID, text, sub, checkID };
}

const rows = [
	createData(1, "OUTER CASE INTEGRITY BEFORE KIT INSTALLATION: ABSENCE OF DEEP DEFORMATIONS ON METAL SHEET", [], 0),
	createData(2, "ABSENCE  OF SHARP POINTS OR CUTTING EDGES ON METAL SHEET", [], 1),
	createData(3, "ABSENSE OF LEAKAGE INSIDE AUTOMATIC WASH SINK", [], 2),
	createData(4, "REFURBISH KIT INSTALLED CORRECTLY, FOLLOWING SUPPLIED WRITTEN INSTRUCTIONS", [], 3),
	createData(5, "ABSENSE OF AIR LEAKAGE IN THE PNEUMATIC SYSTEM", [], 4),
	createData(6, "OPERATIONAL TEST OF SAFETY COMPONENTS: PUMP BLOCK SAFETY VALVE, VAPOURS EXTRACTION, DOOR HOOK", [], 5),
	createData(7, "OPERATIONAL TEST OF HYDRAULIC SYSTEM FOR AUTOMATIC WASHING (PUMP ALREADY TESTED)", [], 6),
	createData(8, "OPERATIONAL TEST OF MANUAL WASHING: ATOMISER, VENTURI PUMP, AIR OUTLET HOSE", [], 7),
	createData(9, "EC \"ROSAUTO\" PLATE INSTALLED CORRECTLY", [], 8),
	createData(10, "PRESENCE OF MACHINE ACCESSORIES (Ref. User Manual):", 
		[
			"COMPRESSED AIR SUPPLY HOSE FOR THE SPRAY-GUN",
			"DRY FILTER",
			"SUPPORT FOR CUP AND COVER OF SPRAY-GUN",
			"\"PQ\" CLAMPS",
			"EARTHING CABLE"
		], 9),
	createData(11, "PRESENCE OF: USER MANUAL, EC/EU DECLARATION OF CONFORMITY", [], 10),
	createData(12, "POSITIVE OVERALL VISUAL INSPECTION", [], 11)
];

function generate(array) {
  return (
	<>
	<List>
		{array.map((value) => (	
			<ListItem key={value}>
				<ListItemIcon><ArrowRightIcon/></ListItemIcon>
				<ListItemText>{value}</ListItemText>
			</ListItem>
		))}
	</List>
  </>
  )
}


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
	const { onChange, ...other } = props;
  
	return (
	  <NumericFormat
		{...other}
		getInputRef={ref}
		onValueChange={(values) => {
		  onChange({
			target: {
			  name: props.name,
			  value: values.value,
			},
		  });
		}}
		isNumericString
	  />
	);
  });
  
  NumberFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
  };


const Page = () => {
	const [user, setUser] = useState(null)
	const [unit, setUnit] = useState(null)
	const [pump, setPump] = useState(null)
	const [checklist, setChecklist] = useState(0)
	// const prevModel = usePrevious([unit, pump, checklist])
	const [prevModel, setPrevModel] = useState({})

	const bitStatus = (pos) => ((checklist & (1 << pos)) != 0)
	const toggleBit = (pos) => setChecklist(checklist ^ (1 << pos))	

	const isDirty = () => {
		return prevModel.unit !== unit || prevModel.pump !== pump || prevModel.checklist !== checklist
	}

	const canSave = () => {
		return (user !== null && unit !== null && unit !== '' && isDirty()) ? {} : { disabled: true };
	};

	const canSubmit = () => {
		return (user !== null && unit !== null && unit !== '' && isDirty()) ? {} : { disabled: true };
	};


	return (
    <>
      <Head><title>INSPECTION REPORT</title></Head>
      <Box
        component="main"
        sx={{
			alignItems: 'center',
			display: 'flex',
			flexGrow: 1,
			minHeight: '100%'
        }}>
        <Container maxWidth="md">
		  <Box sx={{ my: 3 }}>
          	<Typography color="textPrimary" variant="h6" align="center">INSPECTION REPORT</Typography>
          </Box>			
          <form onSubmit={() => {}}>
		  	<Grid container spacing={2}>
			  <Grid item xs={5}>
			  	<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
					<Select
						error={Boolean(user === null)}
						helperText="Supervisor can't be empty"
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={user}
						onChange={(event) => setUser(event.target.value)}
						label="Supervisor"
					>
						<MenuItem value={10}>MIKI</MenuItem>
						<MenuItem value={20}>SK1</MenuItem>
						<MenuItem value={30}>USER2</MenuItem>
					</Select>					
				</FormControl>
  				</Grid>
  				<Grid item xs={2}>
				  	<Button
                		color="primary"
                		fullWidth
                		size="large"
						onClick={() => console.log(prevModel)}
                		variant="contained">                
					NEW
              		</Button>
  				</Grid>
  				<Grid item xs={2}>
				  	<Button
                		color="primary"
                		fullWidth
                		size="large"
						{...canSave()}
						onClick={() => setPrevModel({unit, pump, checklist})}
                		variant="contained">                
					SAVE
              		</Button>
  				</Grid>
  				<Grid item xs={3}>
				  	<Button
                		color="secondary"
                		fullWidth
                		size="large"
						{...canSubmit()}
						type="submit"
                		variant="contained">                
					SUBMIT
              		</Button>
  				</Grid>
		    </Grid>
            <TextField
              fullWidth
              label="Unit Serial"
              margin="normal"
              name="unitSerial"
			  InputProps={{
				inputComponent: NumberFormatCustom,
			  }}
              onChange={(event) => setUnit(event.target.value)}
              type="text"
              value={unit}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Pump serial"
              margin="normal"
              name="pumpSerial"
			  InputProps={{
				inputComponent: NumberFormatCustom,
			  }}
              onChange={(event) => setPump(event.target.value)}
              type="text"
              value={pump}
              variant="outlined"
            />
			<Typography color="textPrimary" align="center" margin="10px" fontWeight="bold">
				THE UNIT WAS SUCCESSFULLY SUBJECTED TO THE FOLLOWING CHECKS: {checklist}
			</Typography>
			<TableContainer component={Paper} sx={{ height: 550 }}>
				  <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
					<TableBody 
					  sx={{ "& tr:nth-of-type(2n+1)": { backgroundColor: "grey.100" }}}>          
					{rows.map((row) => (
						<TableRow
						  key={row.ID}>
						  <TableCell sx={{ border: 1 }} align="center" component="th" scope="row">{row.ID}</TableCell>
						  <TableCell sx={{ border: 1 }} align="left">
							{row.text}
							{ 
								row.sub.length > 0 ? generate(row.sub) : null
							}
						  </TableCell>
						  <TableCell sx={{ border: 1 }} align="center">
							<Checkbox 
								checked={bitStatus(row.checkID)}
								onChange={() => toggleBit(row.checkID)}
								inputProps={{ 'aria-label': 'controlled' }} />
						  </TableCell>
						</TableRow>
					))}
					</TableBody>
				  </Table>
				</TableContainer>	            
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Page;