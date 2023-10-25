import React, { useState, useEffect } from 'react';
import { PostAxiosData, GetAxiosData } from '../api/ApiMethods';

const Form1 = () => {
    const apiUrl = "/employees";
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [departmentError, setDepartmentError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [apiImage, setApiImage] = useState(null);
    const [apiId, setApiId] = useState('');


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            //converts the readed file to data url
            reader.onload = () => {
                setImage(reader.result);
                setImageError('');
            };
        } else {
            setImage(null);
            setImageError('Please upload a valid image file.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (name.trim() === '') {
            setNameError('Please Enter the Name');
            isValid = false;
        } else {
            setNameError('');
        }

        if (age === '') {
            setAgeError('Please Enter the Age');
            isValid = false;
        } else {
            setAgeError('');
        }

        if (department.trim() === '') {
            setDepartmentError('Please Enter the Department');
            isValid = false;
        } else {
            setDepartmentError('');
        }

        if (salary === '') {
            setSalaryError('Please Enter the Salary');
            isValid = false;
        } else {
            setSalaryError('');
        }

        if (!image) {
            setImageError('Please upload an image');
            isValid = false;
        } else {
            setImageError('');
        }

        if (isValid) {
            setIsFormValid(true);
        }
    };

    useEffect(() => {
        if (isFormValid) {
            PostAxiosData(apiUrl, {
                name: name,
                age: age,
                department: department,
                salary: salary,
                image: image,
            })
                .then((response) => {
                    alert('Form data posted successfully');
                    console.log('after request');
                    setName("");
                    setAge("");
                    setDepartment("");
                    setSalary("");
                    setImage();
                    setIsFormValid(false);
                    return response;
                })
                .catch((error) => {
                    console.error('Error posting form data:', error);
                    alert('Error posting form data');
                });
        }
    }, [isFormValid]);

    const handleGetFromApi = () => {
        GetAxiosData(`/employees/${apiId}`)
            .then(response => {
                setApiImage(response.data.image);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }
    return (
        <>
            <div className="row mb-2">
                <div className="col-lg-6">
                    <h1 className="text-center p-3 bg-success rounded-3 mt-2 shadow-lg">Employee Details</h1>
                    <form className="row g-3 bg-light text-dark p-3 mt-2 rounded-3 shadow-lg" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <div className={`form-val ${nameError ? 'error' : ''}`}>
                                <label htmlFor="names" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="names"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p style={{ color: 'rgb(197, 34, 34)' }}>{nameError}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`form-val ${ageError ? 'error' : ''}`}>
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <p style={{ color: 'rgb(197, 34, 34)' }}>{ageError}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={`form-val ${departmentError ? 'error' : ''}`}>
                                <label htmlFor="department" className="form-label">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <p style={{ color: 'rgb(197, 34, 34)' }}>{departmentError}</p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className={`form-val ${salaryError ? 'error' : ''}`}>
                                <label htmlFor="salary" className="form-label">
                                    Salary
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <p style={{ color: 'rgb(197, 34, 34)' }}>{salaryError}</p>
                            </div>
                        </div>
                        <input type="hidden" id="employeeId" />
                        <div className=' row'>
                            <div className="col-lg-12 my-2">
                                <div className="d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="inputGroupFile01"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <p style={{ color: 'rgb(197, 34, 34)' }}>{imageError}</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className=' row'>
                <div className=' col-lg-12 '>
                    <input
                        type="text"
                        className="form-control"
                        id="autoSizingInput"
                        placeholder="Id"
                        value={apiId}
                        onChange={(e) => setApiId(e.target.value)}
                    />
                    <button onClick={handleGetFromApi}>Get Image from API</button>

                    {apiImage && (
                        <div>
                            <h3>Image from API:</h3>
                            <img src={apiImage} alt="From API" style={{ maxWidth: '300px' }} />
                        </div>
                    )}
                </div>
            </div>
        </>



    );
};

export default Form1;
