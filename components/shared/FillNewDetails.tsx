

const FillNewDetails = (props: any) => {
    return (
        <div className="flex flex-col gap-3">
            <div>
                <p className="value">Report Type</p>
                <div className="flex items-center gap-5 radio my-2">
                    <div>
                        <input type="radio" name="type" id="Daily" value={"daily"} />
                        <p>Daily</p>
                    </div>

                    <div>
                        <input type="radio" name="type" id="Daily" value={"weekly"} />
                        <p>Weekly</p>
                    </div>

                    <div>
                        <input type="radio" name="type" id="Daily" value={"monthly"} />
                        <p>Monthly</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 edit">
                <div className="flex flex-col">
                    <p className="value">
                        Project
                    </p>

                    <select name="" id="">
                        <option value="Bode Peters">Bode Peters</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Project Summary
                    </p>

                    <select name="" id="">
                        <option value="Bode Peters">Bode Peters</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="value">Project Supervisor</p>
                <select name="" id="" className="w-full">
                    <option value="">Abayomi Salomi</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-5 edit-info">
                <div className="flex flex-col gap-2">
                    <p className="value">Challenges Encountered</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Proffered Solution</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Future Recommendation</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Proffered Solution</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Equipment on Site / Status</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="value">Visitors to Site</p>
                    <textarea name="" id=""></textarea>
                </div>

                <div className="flex col-span-2 flex-col gap-2">
                    <p className="value">Weather Report</p>
                    <textarea name="" id=""></textarea>
                </div>


                <button className="bg-[#EBEBEB] text-textColor rounded-md">Cancel</button>
                <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={()=> {props.setState(false)}}>Submit</button>

            </div>
        </div>
    )
}

export default FillNewDetails