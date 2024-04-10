import { useGetNewReport } from '@/store/report/ReportStore';
import React, { useEffect, useState } from 'react';

const FillNewDetails = (props: any) => {
    const { newReport, setNewReport } = useGetNewReport()

    const [formData, setFormData] = useState({ ...newReport })
    // const [formData, setFormData] = useState({
    //     report_type: '',
    //     created_for: '',
    //     project_name: '',
    //     project_code: '',
    //     project_supervisor: '',
    //     report_summary: '',
    //     challenges: '',
    //     solutions: '',
    //     recommendation: '',
    //     weekly_projection: '',
    //     materials_required_for_projection: '',
    //     materials_on_site: '',
    //     status: '',
    //     submitted_by: '',
    //     submitted_on: '',
    //     visitor: '',
    //     weather: ''
    // });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));

    };

    useEffect(() => {
        setNewReport(formData);
        console.log(newReport)
    }, [formData])

    return (
        <div className="flex flex-col gap-3">
            <div>
                <p className="value">Report Type</p>
                <div className="flex items-center gap-5 radio my-2">
                    <div>
                        <input type="radio" name="report_type" id="Daily" checked={formData.report_type == "Daily"} value="Daily" onChange={handleInputChange} />
                        <label htmlFor="Daily">Daily</label>
                    </div>

                    <div>
                        <input type="radio" name="report_type" id="Weekly" checked={formData.report_type == "Weekly"} value="Weekly" onChange={handleInputChange} />
                        <label htmlFor="Weekly">Weekly</label>
                    </div>

                    <div>
                        <input type="radio" name="report_type" id="Monthly" checked={formData.report_type == "Monthly"} value="Monthly" onChange={handleInputChange} />
                        <label htmlFor="Monthly">Monthly</label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 edit">
                <div className="flex flex-col">
                    <p className="value">Project</p>
                    <select name="project_name" value={formData.project_name} onChange={handleInputChange}>
                        <option value="Project X">Project X</option>
                        <option value="Project Y">Project Y</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <p className="value">Project Summary</p>
                    <select name="report_summary" value={formData.report_summary} onChange={handleInputChange}>
                        <option value="Summary of Project X">Summary of Project X</option>
                        <option value="Summary of Project Y">Summary of Project Y</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="value">Project Supervisor</p>
                <select name="project_supervisor" value={formData.project_supervisor} onChange={handleInputChange} className="w-full">
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="John Doe">John Doe</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-5 edit-info">
                <div className="flex flex-col gap-2">
                    <p className="value">Challenges Encountered</p>
                    <textarea name="challenges" value={formData.challenges} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Proffered Solution</p>
                    <textarea name="solutions" value={formData.solutions} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Future Recommendation</p>
                    <textarea name="recommendation" value={formData.recommendation} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Weekly Projection</p>
                    <textarea name="weekly_projection" value={formData.weekly_projection} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Materials Required for Projection</p>
                    <textarea name="materials_required_for_projection" value={formData.materials_required_for_projection} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Materials on Site</p>
                    <textarea name="materials_on_site" value={formData.materials_on_site} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Status</p>
                    <textarea name="status" value={formData.status} onChange={handleInputChange}></textarea>
                </div>

                {/* <div className="flex flex-col gap-2">
                    <p className="value">Submitted By</p>
                    <textarea name="submitted_by" value={formData.submitted_by} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Submitted On</p>
                    <textarea name="submitted_on" value={formData.submitted_on} onChange={handleInputChange}></textarea>
                </div> */}

                <div className="flex flex-col gap-2">
                    <p className="value">Visitor</p>
                    <textarea name="visitor" value={formData.visitor} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                    <p className="value">Weather</p>
                    <textarea name="weather" value={formData.weather} onChange={handleInputChange}></textarea>
                </div>

                {/* <div className="flex justify-between"> */}
                <button className="bg-[#EBEBEB] text-textColor rounded-md">Cancel</button>
                <button className="bg-primaryLight text-white p-3 rounded-md" onClick={() => { props.setState(false); props.setForm(formData) }}>Next</button>
                {/* </div> */}
            </div>


        </div>
    )
}

export default FillNewDetails;
