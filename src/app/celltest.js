import {app, bus} from './app';

export default {  
    props: {
        d: Object
    },
    data: function() {
        return {
            showFI: false,
            showOI: false,
            showFloorPlan: false,
            fdata: this.d,
            deal: undefined,
            orderdata: undefined
        }
    },
    methods: {
        clickFI: function(c) {
            this.showFI = c;
        },
        clickOI: function(c) {
            this.showOI = c;
        }
    },
    computed: {
        status: function() {
            if(parseInt(this.d.sold) > 0) return "chess f-sold";
            return "chess"
        },
        cellstyle: function() {
            if(this.deal && this.fdata.deal_id) {
                var stages = {
                    'C3:LOSE' : 'aaffaa',
                    'C3:WON' : '7aaaff',
                    'C3:FINAL_INVOICE' : 'ffaaff',
                    'C3:PREPAYMENT_INVOICE' : 'aaffff',
                    'C10:PREPARATION': '7fffaa'
                };
                var st = stages[this.deal.STAGE_ID];
                return "background-color: #" + ( st ? st : "aaaaaa");
            }
            else if(!this.deal && this.fdata.deal_id) {
                return "background-color: #ffcaaa";
            } else {
                return "background-color: #f0f0f0";                
            }
        },
        isSold: function() {
            return (parseInt(this.d.sold) > 0);
        }
    },
    asyncComputed: {
        dealdata: async function() {
            if(this.fdata.deal_id) {
                var d = await app.getDealData(this.fdata.deal_id);
                if(d.success) {
                    this.deal = d.data;
                }
                else {
                    console.log('error(as)',d.data);
                    this.deal = undefined;
                }
            }
            return this.deal;
        },        
        odata: async function() {
                var d = await app.getOrderData(this.d.id);
                this.orderdata = d;
                //bus.$emit('order-refresh');
    console.log('acOD', d);
                return d;
        }

    },
    mounted: function () {
        var self = this;
        bus.$on('close-fi', function () {
            self.showFI = false;
        });
        bus.$on('close-oi', function () {
            self.showOI = false;
        });
    }
}
