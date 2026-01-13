
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';

@Controller('history')
@ApiTags('History')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) { }

    @Get()
    @ApiOperation({ summary: 'Get recent job execution history' })
    @ApiResponse({ status: 200, description: 'List of execution logs' })
    async getHistory() {
        return this.historyService.getAllHistory();
    }
}
