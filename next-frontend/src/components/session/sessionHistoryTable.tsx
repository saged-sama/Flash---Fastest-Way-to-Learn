'use client';
import { useSpringBase } from "@/context/SpringBaseContext";
import Paginated from "../common/paginated";
import SpringBase from "@/lib/springbase/springbase";
import { Table, TableProps } from "antd";
import { useEffect } from "react";
import { getDateTimeFromString } from "@/lib/utils";

interface SessionDetails {
    key: string,
    owner: any,
    title: string,
    description: string,
    state: string,
    startTime: string,
    endTime: string,
    createdAt: string,
    updatedAt: string
}

const columns: TableProps<SessionDetails>['columns'] = [
    {
        title: "Title",
        dataIndex: "title",
        key: "title"
    },
    {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
        render: (owner) => <a href={`/users/${owner.id}`} className="text-blue-600">{owner.name}</a>
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description"
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state",
        render: (state) => <p className={
            (state === "STARTED" ? "text-green-500" : 
            state === "FINISHED" ? "text-gray-500" : 
            "text-orange-500") + " font-bold"
        }>{state}</p>
    },
    {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        render: (startTime) => startTime ? getDateTimeFromString(startTime) : "N/A"
    },
    {
        title: "End Time",
        dataIndex: "endTime",
        key: "endTime",
        render: (endTime) => endTime ? getDateTimeFromString(endTime) : "N/A"
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt) => getDateTimeFromString(createdAt)
    },
    {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (updatedAt) => getDateTimeFromString(updatedAt)
    }
];

export default function sessionHistoryTable() {
    const { springbase } = useSpringBase();

    useEffect(() => {
        if(!springbase){
            return;
        }

    }, [springbase]);

    if(!springbase){
        return <Table />
    }

    return (
        <Paginated
            springbase={springbase as SpringBase}
            collectionName="sessions"
            options={{
                filter: `owner.id=${springbase.authStore.model.id}`,
                sort: "createdAt",
                skipTotal: false
            }}
            perPage={6}
        >
            {(data: any) => 
                <Table 
                    columns={columns} 
                    dataSource={data}
                    pagination={false}
                    className=""
                />
            }
        </Paginated>
    );
}