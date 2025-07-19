import { LabledInputType } from "@infinityMeet/types"


export const LabledInput = ({ lable, placeholder, onChange, type }: LabledInputType) => {
    return (
        <div className="pt-4">
            <label
                htmlFor="first_name"
                className="block mb-2 text-md font-semibold pt-2"
            >
                {lable}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-3"
                placeholder={placeholder}
                required />
        </div>
    )
}