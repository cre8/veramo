import { v4 as uuidv4 } from 'uuid'

/**
 * Result interface for sending DIDComm messages through
 * {@link IDIDCommTransport.send}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export interface IDIDCommTransportResult {
  result?: string
  error?: string
  returnMessage?: string
}

/**
 * Common interface for transports that can be used in the
 * {@link DIDComm} module.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export interface IDIDCommTransport {
  /**
   * Identifier of this transport that can be used in case the
   * message thread supports reusing the transport connection.
   */
  id: string

  /**
   * Returns `true` if this transport is suitable for the provided
   * DID Document service section, otherwise `false`.
   * @param service - The DID Document service section
   *
   * @beta This API may change without a BREAKING CHANGE notice.
   */
  isServiceSupported(service: any): boolean

  /**
   * Sends the provided raw message (without further processing) to
   * the service endpoint defined in the provided DID Document service
   * section.
   *
   * @param service - The DID Document service section that contains
   * a `serviceEndpoint` entry.
   * @param message - The message to be sent.
   *
   * @beta This API may change without a BREAKING CHANGE notice.
   */
  send(service: any, message: string): Promise<IDIDCommTransportResult>
}

/**
 * Abstract implementation of {@link IDIDCommTransport}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export abstract class AbstractDIDCommTransport implements IDIDCommTransport {
  id: string

  /**
   * Shared constructor that takes an optional identifier (for reusing) for
   * this {@link IDIDCommTransport}.
   *
   * @param id - An optional identifier for this {@link IDIDCommTransport}.
   *
   * @beta This API may change without a BREAKING CHANGE notice.
   */
  constructor(id?: string) {
    this.id = id || uuidv4()
  }

  /** {@inheritdoc IDIDCommTransport.isServiceSupported} */
  abstract isServiceSupported(service: any): boolean

  /** {@inheritdoc IDIDCommTransport.send} */
  abstract send(service: any, message: string): Promise<IDIDCommTransportResult>
}
