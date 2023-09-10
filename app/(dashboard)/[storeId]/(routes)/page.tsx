import { getGraphRevenue } from "@/action/get-graph-revenue";
import { getSalesCount } from "@/action/get-sae-count";
import { getTotalRevenue } from "@/action/get-total-revenue";
import { Overview } from "@/components/overview";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { DollarSign, Package } from "lucide-react";

import React from "react";

interface DashboardPageProps{
    params: {storeId: string}
};

const DashboardPage:React.FC<DashboardPageProps>  = async({
    params
})=> {
     const totalRevenue = await getTotalRevenue(params.storeId);
     
     const SalesCount = await getSalesCount(params.storeId)

     const stockCount  = await getSalesCount(params.storeId)
     const graphRevenue = await getGraphRevenue(params.storeId);
    
     
     


   return(
    <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Heading title="Dashboard"
        description="Overview of your Store"
        />
        <Separator/>
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle text-sm font-medium>
            Total Revenues
               <DollarSign className="h-4 w-4 text-muted-foreground"/>
            </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {
                        formatter.format(totalRevenue)
                    }
                </div>
            </CardContent>
            
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle text-sm font-medium>
            Sales
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">
                    +{
                     SalesCount
                    }
                </div>
            </CardContent>
            
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle text-sm font-medium>
                  Products In Stock
            
               <Package className="h-4 w-4 font-bold"/>
            </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">

                <div className="text-2xl font-bold">
                    {
                       stockCount
                    }
                </div>
            </CardContent>
            
          </Card>
        </div>
         <Card className="col-span-4">
            <CardHeader>
            <CardTitle>
               Overview
            </CardTitle>
            </CardHeader>
            
              <CardContent>
                <Overview data={ graphRevenue}/>
              </CardContent>
         </Card>

        </div> 
  
    
    </div>
   )
}

export default DashboardPage;