import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from '@app/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionType, ConnectionsResponse } from './dto/connection.dto';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  async findAll(params: {
    searchText: string;
    limit: number;
    page: number;
    userId: string;
    status: ConnectionStatus;
    connectionType: ConnectionType;
  }): Promise<ConnectionsResponse> {
    let where: any = {
      status: params.status,
    };

    if (params.connectionType === ConnectionType.FOLLOWER) {
      where['followingId'] = params.userId;
    } else if (params.connectionType === ConnectionType.FOLLOWING) {
      where['followerId'] = params.userId;
    } else {
      where = [
        { followingId: params.userId, status: params.status },
        { followerId: params.userId, status: params.status },
      ];
    }

    const [entries, total] = await this.connectionRepository.findAndCount({
      where,
      skip: params.page ? (params.page - 1) * params.limit : 0,
      take: params.limit,
      relations: ['following', 'follower'],
    });

    return {
      entries,
      total,
    };
  }

  /**
   *
   * @param followingId is the receiver of request
   * @param followerId is the requester
   * @returns {Connection}
   */
  async sendRequest({
    followingId,
    followerId,
  }: {
    followingId: string;
    followerId: string;
  }) {
    const request = await this.connectionRepository.findOne({
      where: {
        followingId,
        followerId,
      },
    });

    if (request) {
      if (request.status === ConnectionStatus.ACCEPTED) {
        throw new UnprocessableEntityException('You both already connected');
      }

      throw new UnprocessableEntityException(
        'Connection request already exists',
      );
    }

    return this.connectionRepository.create({ followingId, followerId }).save();
  }

  async acceptRequest(id: string) {
    const request = await this.connectionRepository.findOne({
      where: {
        id,
      },
    });

    if (request.status === ConnectionStatus.ACCEPTED) {
      throw new UnprocessableEntityException('Request already accepted');
    }

    if (!request) {
      throw new NotFoundException('Request does not exists');
    }

    request.status = ConnectionStatus.ACCEPTED;
    await request.save();

    return request;
  }

  async deleteRequest(id: string) {
    const request = await this.connectionRepository.findOne({
      where: {
        id,
      },
    });

    if (!request) {
      throw new NotFoundException('Request does not exists');
    }
    await request.remove();

    return 'Deleted successfully';
  }

  async isConnected(followerId: string, followingId: string) {
    return this.connectionRepository.findOne({
      where: [
        { followerId, followingId, status: ConnectionStatus.ACCEPTED },
        {
          followerId: followingId,
          followingId: followerId,
          status: ConnectionStatus.ACCEPTED,
        },
      ],
    });
  }
}
