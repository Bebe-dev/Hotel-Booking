import { ArrowDown } from "tabler-icons-react";

export default function BlueButton() {
    return(
        <button className="flex gap-2 items-center text-[#175CD3] bg-[#EFF8FF] rounded-3xl p-1">Show more <ArrowDown size={16} /> </button>
    )
}