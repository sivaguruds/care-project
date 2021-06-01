import React, {useState, useEffect} from 'react'
import 'date-fns';
import AccountApi from '../../../services/api/account/accountAll';
import {Link} from "react-router-dom";
import BackIcon from '@material-ui/icons/ArrowBackIos';
import EmilIcon from '@material-ui/icons/Email';
import {
    Grid,
    Paper,
    Typography, 
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem,
    Input,
    Checkbox,
    ListItemText,
    Divider,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    InputLabel
} 
from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


const YearList = () => {
    const minOffset = 0;
    const maxOffset = 60;
    let yearOptions = []
    const thisYear = (new Date()).getFullYear();
    for (let index = minOffset; index <= maxOffset; index++) {
        const element = thisYear - index;
        yearOptions.push(element)
    }

    return (
        <div>
        {yearOptions.map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
        ))}
        </div>
    )
}

const AssociateList = ({userIds}) => {
    const [selectUser, setSelectUser] = useState([]);
    const [userList, setUserList] = useState([])
    const [selectAll, setSelectAll] = useState({
        selectValue: false
    })

    const {selectValue} = selectAll;

    const selectChange = (event) => {
        setSelectAll({...selectAll, [event.target.name]: event.target.checked})
        // userList.forEach(user => user.id = event.target.checked)
        // console.log(userList)
        // const newUser = [...userIds]
        // if(!selectAll.selectValue){
        //     for (let item in userList) {
        //         newUser.push(userList[item].value);
        //     }
        //     console.log('test', newUser)
        //     GetSelectOrgValue(newUser)
        // } 
    }

    const singleChanges = (event) => {
        setSelectAll(false)
    }

    const GetSelectOrgValue = (myArray) => {
        let result = userList.filter( (el) => {
            return myArray.includes(el.value)
        })

        setSelectUser(result)
    }

    // COUNTRY CODE API
    const organizationList = async () => {
        await AccountApi.organizationLoad()
        .then((response) =>{
            let data = response.data
            let orgArray = []
            data.forEach( el => {
                let singleOrg = {
                    label: el.name,
                    value: el.id
                }
                orgArray.push( singleOrg)
            })
            setUserList(orgArray)
        })
        .catch(err =>{
            console.error(err);
        })
    }

    useEffect(() => {
        organizationList()
    }, [])



    return (
        <Grid container className="form-field">
            <Grid xs={12} sm={12} item>
            <FormControlLabel
                control={<Checkbox checked={selectValue} onChange={selectChange}  name="selectValue" />}
                label="Select All"
            />
            <Divider/>
            </Grid>
            <div className="org-height">
            {userList.map((item, index) =>(
                <Grid xs={12} sm={12} item>
                        <FormControlLabel
                            control={<Checkbox key={item.id} checked={item.id} onChange={singleChanges}  name={item.id} />}
                            label={item.label}
                        />
                </Grid>
            ))}
            </div>
        </Grid>
    )
}

const DegreeList = ({degree, index}) => {
    return (
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{degree.name}</TableCell>
                <TableCell>{degree.institute_name}</TableCell>
                <TableCell>{degree.year_of_passing}</TableCell>
                <TableCell>Edit</TableCell>
            </TableRow>
    )
}

const CreateDegree = ({addDegree}) => {
    const [valueName, setValue] = useState({
        degreeName: '',
        passingYear: '',
        instit: ''
    })

    const [degreeOption, setDegreeOption] = useState([])
    const [yearDegree, setYearDegree] = useState([]);

    // DEGREE NAME CODE API
    const degreeNameList = async () => {
        await AccountApi.degreeNameLoad()
        .then((response) =>{
            let data = response.data
            let degreeArray = []
            data.forEach( el => {
                let singleDegree = {
                    label: el.name,
                    value: el.name
                }
                degreeArray.push( singleDegree)
            })
            setDegreeOption(degreeArray)
        })
        .catch(err =>{
            console.error(err);
        })
    }

    const minOffset = 0;
    const maxOffset = 60;
    const thisYear = (new Date()).getFullYear();
    const yearLoad = () => {
        let yearOptions = []
        for (let index = minOffset; index <= maxOffset; index++) {
            const element = thisYear - index;
            yearOptions.push(element)
        }
    
        setYearDegree(yearOptions)
    }

    
    

    const handleInputSubmit = (event) => {
        const value = event.target.value
        setValue({ ...valueName, [event.target.name]: value });
    }

    const addList = () => {
        if((valueName.degreeName === '') && (valueName.passingYear === '') && (valueName.instit === '')){
            alert('message')
            return
        }
        addDegree(valueName)
        setValue({
            degreeName: '',
            passingYear: '',
            instit: ''
        })
    }

    useEffect(() => {
        degreeNameList()
        yearLoad()
    }, [])




    return (
        <div>
            <Grid container>
                <Grid sm={3} item>
                    <InputLabel  htmlFor="degreeName">Degree Name</InputLabel>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            defaultValue={""}
                            style={{ height: 40 }}
                            id="degreeName"
                            name="degreeName"
                            value={valueName.degreeName}
                            onChange={handleInputSubmit}
                        >
                            {degreeOption.map((de, index) => (
                                <MenuItem key={de.value} value={de.value}>{de.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid sm={3} item>
                    <InputLabel  htmlFor="instit">Institute Name</InputLabel>
                    <FormControl variant="outlined" fullWidth>
                        <OutlinedInput style={{ height: 40 }} type="text" id="instit" name="instit" value={valueName.instit} onChange={handleInputSubmit}/>
                    </FormControl>
                </Grid>
                <Grid sm={3} item>
                    <InputLabel  htmlFor="passingYear">Year of Passing</InputLabel>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            defaultValue={""}
                            style={{ height: 40 }}
                            id="passingYear"
                            name="passingYear"
                            value={valueName.passingYear}
                            onChange={handleInputSubmit}
                        >
                            {yearDegree.map((item, index) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid sm={3}>
                <InputLabel  htmlFor="primary"></InputLabel>
                <Button onClick={addList} variant="contained" color="primary">
                    Add
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

function CreateDoctor() {
    const initialValue = {
       accountType: '0',
       firstName: '',
       lastName: '',
       emailID: '',
       countryCode: '81',
       mobileNumber: '',
       gender: '',
       jmaNumber: '',
       medicalNumber: '',
       yearExp: '',
       multiLan: [],
       userIds: []
    }

    const ageProps = {
        min: 1
    }

    const [doctor, setDoctor] = useState(initialValue);
    const [countryCode, setCountryCode] = useState([]);
    const [language, setLanguage] = useState([]);
    const [expDate, setExpDate] = useState(new Date());
    const [year, setYear] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [genderOption] = useState([
        {
            label: 'Male',
            value: 'Male'
        },
        {
            label: 'Female',
            value: 'Female'
        }
    ])
    const [eduList, setEduList] = useState([
        {
            name: 'BAMS',
            institute_name: 'test',
            year_of_passing: '1920',
        },
        {
            name: 'BA',
            institute_name: 'test',
            year_of_passing: '1922',
        }
    ])

    const minOffset = 0;
    const maxOffset = 60;
    const thisYear = (new Date()).getFullYear();
    const yearLoad = () => {
        let yearOptions = []
        for (let index = minOffset; index <= maxOffset; index++) {
            const element = thisYear - index;
            yearOptions.push(element)
        }
    
        setYear(yearOptions)
    }
    
    
    // COUNTRY CODE API
    const countryCodeList = async () => {
        await AccountApi.countryCode()
        .then((response) =>{
            let data = response.data
            let codeArray = []
            data.forEach( el => {
                let singleCode = {
                    label: el.country_dialing_code,
                    value: el.country_dialing_code
                }
                codeArray.push( singleCode)
            })
            setCountryCode(codeArray)
        })
        .catch(err =>{
            console.error(err);
        })
    }

    // LANGUAGE CODE API
    const languageList = async () => {
        await AccountApi.languageLoad()
        .then((response) =>{
            let data = response.data
            let languageArray = []
            data.forEach( el => {
                let singleLanguage = {
                    label: el.name,
                    value: el.id
                }
                languageArray.push(singleLanguage)
            })
            setLanguage(languageArray)
        })
        .catch(err =>{
            console.error(err);
        })
    }

    useEffect(() => {
        countryCodeList()
        languageList()
        yearLoad()
    }, [])

    // ACCOUNT TYPE ONCHANGE
    const handleInputChange = (event) => {
        const  value = event.target.value;
        console.log(value)
        setDoctor({ ...doctor, [event.target.name]: value });
        console.log(doctor)
    }

    // DATE CHANGE
    const handledateChange = (date) => {
        setExpDate(date)
    }

    const addDegree = (value) => {

        const newDegree = [...eduList, {name: value.degreeName, institute_name: value.instit, year_of_passing: value.passingYear}]
        setEduList(newDegree)
    }

    return (
        <div>
            {/* Tittle Area */}
            <Grid container justify="space-between">
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Create Doctor  
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                    component={Link}
                    to="/admin/doctorList"
                    style={{textTransform: 'none'}}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    startIcon={<BackIcon/>}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>

            {/* Card Area */}
            <Grid className="container-paper" component={Paper} container>
                
                {/* ACCOUNT TYPE */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Account Type <sup>*</sup> </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                    <FormControl>
                        <RadioGroup onChange={handleInputChange} value={doctor.accountType} row aria-label="accountType" name="accountType">
                            <FormControlLabel value="0" control={<Radio />} label="Global" />
                            <FormControlLabel value="1" control={<Radio />} label="Private" />
                        </RadioGroup>
                    </FormControl> 
                    </Grid>
                </Grid>

                {/* FIRST NAME */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">First Name <sup>*</sup> </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="text" id="firstName" name="firstName" value={doctor.firstName} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* LAST NAME */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Last Name <sup>*</sup> </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="text" id="lastName" name="lastName" value={doctor.lastName} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* EMAIL */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Email <sup>*</sup> </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="email" id="emailID" name="emailID" value={doctor.emailID} onChange={handleInputChange} endAdornment={
                                <InputAdornment position="end">
                                    <EmilIcon />
                                </InputAdornment>
                            }/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* MOBILE NUMBER */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Mobile Number</Typography>
                    </Grid>
                    <Grid xs={4} sm={2}  item>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                style={{ height: 40 }}
                                id="countryCode"
                                name="countryCode"
                                value={doctor.countryCode}
                                onChange={handleInputChange}
                            >
                                {countryCode.map((code, index) => (
                                    <MenuItem key={index} value={code.value}>{code.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={8} sm={5}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="text" id="mobileNumber" name="mobileNumber" value={doctor.mobileNumber} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* GENDER */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Gender <sup>*</sup> </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                style={{ height: 40 }}
                                id="gender"
                                name="gender"
                                value={doctor.gender}
                                onChange={handleInputChange}
                            >
                                {genderOption.map((gen, index) => (
                                    <MenuItem key={index} value={gen.value}>{gen.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* AGE */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Age </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="number" id="age" name="age" inputProps={ageProps} value={doctor.age} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* JMA MEMBERSHIP ID NO */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">JMA Membership ID No </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="text" id="jmaNumber" name="jmaNumber" value={doctor.jmaNumber} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* MEDICAL LICENSE NO */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Medical License No</Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <OutlinedInput style={{ height: 40 }} type="text" id="medicalNumber" name="medicalNumber" value={doctor.medicalNumber} onChange={handleInputChange}/>
                        </FormControl>
                    </Grid>
                </Grid>
                
                {/* YEAR OF EXPERIENCE */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Year of Experience </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                        <Select
                            style={{ height: 40 }}
                            id="yearExp"
                            name="yearExp"
                            value={doctor.yearExp}
                            onChange={handleInputChange}
                        > 
                            {/* <YearList/> */}
                            {year.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                 {/* LANGUAGE */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Language </Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <Select
                                style={{ height: 40 }}
                                id="multiLan"
                                name="multiLan"
                                multiple
                                renderValue={ (selected) => selected.join(', ')}
                                value={doctor.multiLan}
                                onChange={handleInputChange}
                            >
                                {language.map((lan, index) => (
                                    <MenuItem key={lan.value} value={lan.value}>
                                        <Checkbox checked={doctor.multiLan.indexOf(lan.value) > -1} />
                                        <ListItemText primary={lan.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* DATE OF EXPIRY */}
                <Grid container className="form-field">
                    <Grid xs={12} sm={3} item>
                        <Typography variant="body1">Date of Expiry</Typography>
                    </Grid>
                    <Grid xs={12} sm={7}  item>
                        <FormControl variant="outlined" fullWidth>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                style={{ height: 40 }}
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                id="expDate"
                                name="expDate"
                                value={expDate}
                                onChange={handledateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>

            {/* Card Area */}
            <Grid className="container-paper" component={Paper} container>
                {/* ACCOUNT TYPE */}
                {userIds}
                <AssociateList userIds={userIds}/>
            </Grid>

            {/* EDUCATION DETAILS */}
            <Grid className="container-paper" component={Paper} container>
                <Grid sm={12}>
                    <CreateDegree addDegree={addDegree}/>
                </Grid>
                <Grid sm={12}  item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell align="left">Degree Name</TableCell>
                                <TableCell align="left">Institute Name</TableCell>
                                <TableCell align="left">Year of Passing</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {eduList.map((degree, index) => (
                                <DegreeList degree={degree} index={index} key={index}/>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            

            
        </div>
    )
}

export default CreateDoctor
