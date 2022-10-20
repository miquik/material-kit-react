import React, { useState } from 'react'
import Head from 'next/head';
import { 
	Box, 
	Container, 
	Grid, 
	Card,
	CardContent,
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
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { NumberFormatCustom } from '../lib/number-format';




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


export const ProductListToolbar = (props) => (
	<Box {...props}>
	  <Box
		sx={{
		  alignItems: 'center',
		  display: 'flex',
		  justifyContent: 'space-between',
		  flexWrap: 'wrap',
		  m: -1
		}}
	  >
		<Box sx={{ m: 1 }}>
		  <Button			
			sx={{ mr: 1 }}
			color="primary"
			variant="outlined"
		  >
			<ReplyOutlinedIcon color="action" />
		</Button>
		</Box>
		<Typography
		  sx={{ m: 1 }}
		  variant="h4"
		>
		  INSPECTION REPORT
		</Typography>
		<Box sx={{ m: 1 }}>
		  <Button			
			sx={{ mr: 1 }}
			color="primary"
			variant="contained"
		  >
			New
		  </Button>
		  <Button			
			sx={{ mr: 1 }}
			color="primary"
			variant="contained"
		  >
			Save
		  </Button>
		  <Button
			color="secondary"
			variant="contained"
		  >
			Submit
		  </Button>
		</Box>
	  </Box>	  
	</Box>
  );


const Page = () => {
	
	return (
    <>    
		<Box>
		<Container>
		<ProductListToolbar sx={{ mt: 1 }}/>
		<Box sx={{ mt: 3 }}>
          <form onSubmit={() => {}}>
			<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Submitted by</InputLabel>
			<Select
						helperText="Supervisor can't be empty"
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Supervisor">
						<MenuItem value={10}>MIKI</MenuItem>
						<MenuItem value={20}>SK1</MenuItem>
						<MenuItem value={30}>USER2</MenuItem>
					</Select>					
			</FormControl>
            <TextField
              fullWidth
              label="Unit Serial"
              margin="normal"
              name="unitSerial"
			  InputProps={{
				inputComponent: NumberFormatCustom,
			  }}
              type="text"
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
              type="text"
              variant="outlined"
            />
			<Typography color="textPrimary" align="center" margin="10px" fontWeight="bold">
				THE UNIT WAS SUCCESSFULLY SUBJECTED TO THE FOLLOWING CHECKS:
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
								inputProps={{ 'aria-label': 'controlled' }} />
						  </TableCell>
						</TableRow>
					))}
					</TableBody>
				  </Table>
				</TableContainer>	            
          </form>
		  </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;