import SpringBase from "@/lib/springbase/springbase";
import { Button } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Paginated({
    springbase,
    collectionName,
    perPage,
    options,
    children
}: {
    springbase: SpringBase,
    collectionName: string,
    perPage: number,
    options: {
        filter?: string,
        sort?: string,
        skipTotal?: boolean
    },
    children: (data: any) => React.ReactNode
}) {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);;
    
    const getSessios = async() => {
        if(!springbase) return;
        const pagedData = await springbase.collection(collectionName).getList(page, perPage, options);
        setData(pagedData.items);
        setTotal(pagedData.totalItems);
        setTotalPages(pagedData.totalPages);
    }

    useEffect(() => {
        getSessios();
    }, [page]);

    const handlePage = (page: number) => {
        setPage(page);
    }

    const handleNextPage = () => {
        if(page === totalPages) return;
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        if(page === 1) return;
        setPage(page - 1);
    }

    return (
        <div className="w-full flex flex-col gap-5">
            <div>
                {children(data)}
            </div>
            <div className="p-5 border-t flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold">
                        Total results:
                    </h1>
                    <h1>
                        {total}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={handlePrevPage} disabled={page === 1}>
                        <ChevronLeft className="w-4 h-4"/>
                    </Button>
                    {page >= 2 && 
                        <Button onClick={() => handlePage(1)}>
                            1
                        </Button>
                    }
                    {page > 2 && <div>...</div>}
                    <Button type="primary">
                        {page}
                    </Button>
                    {page + 1 <= totalPages &&
                        <Button onClick={() => handlePage(page + 1)}>
                            {page+1}
                        </Button>
                    }
                    {page + 2 < totalPages && <div>...</div>}
                    {page + 1 < totalPages && 
                        <Button  onClick={() => handlePage(totalPages)}>
                            {totalPages}
                        </Button>
                    }
                    <Button onClick={handleNextPage} disabled={page === totalPages}>
                        <ChevronRight className="w-4 h-4"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}