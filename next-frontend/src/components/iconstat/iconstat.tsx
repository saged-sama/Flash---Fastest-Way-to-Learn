import { Modal } from "antd";
import { ReactNode } from "react";
import UserDet from "../common/userdet";

export default function IconStat({ icon, stat, color }: { icon: ReactNode; stat: number; color: string }) {
    return(
        <div className="text-xs flex gap-2" style={{ color: color }}>
            <span style={{ color: color }}>{icon}</span>
            <h1>{stat}</h1>
        </div>
    );
}